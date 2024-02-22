<?php

namespace App\Http\Controllers;

use App\Services\Mail\Parsing\ParsedEmail;
use App\Services\Mail\TransformEmailIntoTicketOrReply;
use App\Services\Mail\Transformers\MimeMailTransformer;
use Common\Core\BaseController;
use Common\Settings\Mail\GmailClient;

class GmailWebhookController extends BaseController
{
    public function handle()
    {
        $newHistoryId = json_decode(
            base64_decode(request()->input('message.data')),
            true,
        )['historyId'];

        $token = json_decode(file_get_contents(GmailClient::tokenPath()), true);
        $lastHistoryId = $token['lastHistoryId'] ?? null;
        $token['lastHistoryId'] = $newHistoryId;
        file_put_contents(GmailClient::tokenPath(), json_encode($token));

        if ($lastHistoryId) {
            $emails = app(GmailClient::class)->listHistory($lastHistoryId);
            foreach ($emails as $email) {
                $decoded = base64_decode(
                    str_replace(['-', '_'], ['+', '/'], $email->getRaw()),
                );
                $emailData = (new MimeMailTransformer())->transform($decoded);

                (new TransformEmailIntoTicketOrReply(
                    new ParsedEmail($emailData),
                ))->execute();
            }
        }

        return $this->success();
    }
}
