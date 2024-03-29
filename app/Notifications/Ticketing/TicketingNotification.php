<?php

namespace App\Notifications\Ticketing;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\SlackAttachment;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;

abstract class TicketingNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Provided by extending class.
     */
    public const NOTIF_ID = null;

    abstract protected function mainAction(): array;
    abstract protected function image(): string;
    abstract protected function lines(User $notifiable): array;

    public function via(User $notifiable): array
    {
        $channels = [];

        if (
            $sub = $notifiable->notificationSubscriptions
                ->where('notif_id', static::NOTIF_ID)
                ->first()
        ) {
            foreach (array_filter($sub->channels) as $channel => $isSelected) {
                if ($channel === 'browser') {
                    $channels = array_merge($channels, [
                        'database',
                        'broadcast',
                    ]);
                } elseif ($channel === 'email') {
                    $channels[] = 'mail';
                } else {
                    $channels[] = $channel;
                }
            }
        }

        return $channels;
    }

    public function toMail(User $notifiable): MailMessage
    {
        $mainAction = $this->mainAction();
        $subject = method_exists($this, 'subject')
            ? $this->subject()
            : strip_tags(str_replace('**', '', $this->lines($notifiable)[0]));
        $msg = (new MailMessage())->subject($subject);

        foreach ($this->lines($notifiable) as $line) {
            $msg->line($line);
        }

        return $msg->action($mainAction['label'], $mainAction['action']);
    }

    public function toSlack(User $notifiable): SlackMessage
    {
        return (new SlackMessage())
            ->image($this->image())
            ->content(strip_tags($this->lines($notifiable)[0]))
            ->error()
            ->attachment(function (SlackAttachment $attachment) use($notifiable) {
                $mainAction = $this->mainAction();
                $attachment
                    ->title($mainAction['label'], $mainAction['action'])
                    ->content(strip_tags($this->lines($notifiable)[1]));
            });
    }

    public function toArray(User $notifiable): array
    {
        return [
            'image' => $this->image(),
            'mainAction' => $this->mainAction(),
            'lines' => array_map(
                fn($line) => ['content' => $line],
                $this->lines($notifiable),
            ),
        ];
    }
}
