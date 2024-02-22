<?php namespace App\Http\Controllers;

use App\Services\Mail\CreateTicketForFailedOutgoingEmail;
use App\Services\Mail\Parsing\ParsedEmail;
use App\Services\Mail\TransformEmailIntoTicketOrReply;
use App\Services\Mail\Transformers\MailgunMailTransformer;
use Common\Core\BaseController;

class MailgunWebhookController extends BaseController
{
    public function handleIncoming()
    {
        if (!settings('incoming_email.mailgun.enabled')) {
            return $this->success();
        }

        if (!$this->isValidRequest()) {
            return response(
                'Could not verify request is coming from mailgun',
                406,
            );
        }

        $emailData = (new MailgunMailTransformer())->transform(
            request()->all(),
        );
        (new TransformEmailIntoTicketOrReply(
            new ParsedEmail($emailData),
        ))->execute();

        return $this->success();
    }

    public function handleFailed()
    {
        if (!settings('incoming_email.mailgun.enabled')) {
            return $this->success();
        }

        if (!$this->isValidRequest()) {
            return response(
                'Could not verify request is coming from mailgun',
                406,
            );
        }

        (new CreateTicketForFailedOutgoingEmail())->execute([
            'recipient' => request('event-data.recipient'),
            'reason' => request('event-data.reason'),
            'description' => request('event-data.delivery-status.description'),
            'headers' => request('event-data.message.headers'),
        ]);

        return $this->success();
    }

    protected function isValidRequest()
    {
        if (!settings('incoming_email.mailgun.verify')) {
            return true;
        }

        $signature = is_array(request('signature'))
            ? request('signature')
            : request()->all();

        $apiKey = config('services.mailgun.secret');
        $token = $signature['token'];
        $timestamp = $signature['timestamp'];
        $signature = $signature['signature'];

        if (!$apiKey || !$token || !$timestamp || !$signature) {
            return false;
        }

        //check if the timestamp is fresh
        if (abs(time() - $timestamp) > 15) {
            return false;
        }

        //returns true if signature is valid
        return hash_hmac('sha256', $timestamp . $token, $apiKey) === $signature;
    }
}
