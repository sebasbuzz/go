<?php

namespace App\Console;

use App\Console\Commands\ImportEmailsViaImap;
use App\Console\Commands\RefreshDemoSite;
use App\Services\Triggers\TriggersCycle;
use Common\Settings\Mail\GmailClient;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [];

    protected function schedule(Schedule $schedule): void
    {
        if ($imapConnections = settings('incoming_email.imap.connections')) {
            foreach ($imapConnections as $connection) {
                if (
                    $connection['createTickets'] ||
                    $connection['createReplies']
                ) {
                    $schedule
                        ->command(ImportEmailsViaImap::class, [
                            $connection['id'],
                        ])
                        ->everyMinute();
                }
            }
        }

        if (settings('incoming_email.gmail.enabled')) {
            $schedule
                ->call(function () {
                    (new GmailClient())->watch();
                })
                ->daily();
        }

        $schedule
            ->call(function () {
                app(TriggersCycle::class)->executeTimeBasedTriggers();
            })
            ->hourly();

        if (config('common.site.demo')) {
            $schedule->command(RefreshDemoSite::class)->daily();
        }
    }

    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
