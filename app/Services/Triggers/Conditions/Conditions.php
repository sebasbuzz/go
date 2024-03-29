<?php namespace App\Services\Triggers\Conditions;

use App;
use App\Models\Condition;
use App\Models\Ticket;
use App\Models\Trigger;
use Illuminate\Support\Collection;
use Str;

class Conditions {

    /**
     * Check if specified ticket meets triggers conditions. If true, trigger action should be fired.
     *
     * @param array|null $originalTicket
     *
     * @return bool
     */
    public function areMet(Trigger $trigger, Ticket $updatedTicket, $originalTicket = null)
    {
        if ($trigger->conditions->isEmpty()) return false;

        return $this->conditionsWithTypeAllAreMet($trigger->conditions, $updatedTicket, $originalTicket) &&
               $this->conditionsWithTypeAnyAreMet($trigger->conditions, $updatedTicket, $originalTicket);
    }


    /**
     * Check if all conditions with match type 'all' are met.
     *
     * @param Collection $conditions
     * @param Ticket $updatedTicket
     * @param array|null $originalTicket
     * @return bool
     */
    private function conditionsWithTypeAllAreMet($conditions, $updatedTicket, $originalTicket)
    {
        $conditions = $this->filterConditionsByMatchType($conditions, 'all');

        if ($conditions->isEmpty()) return true;

        foreach($conditions as $condition) {
            if ( ! $this->conditionIsMet($updatedTicket, $originalTicket, $condition)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if either of conditions with match type 'any' are met.
     *
     * @param Collection $conditions
     * @param Ticket $updatedTicket
     * @param array|null $originalTicket
     * @return bool
     */
    private function conditionsWithTypeAnyAreMet($conditions, $updatedTicket, $originalTicket)
    {
        $conditions = $this->filterConditionsByMatchType($conditions, 'any');

        if ($conditions->isEmpty()) return true;

        foreach($conditions as $condition) {
            if ($this->conditionIsMet($updatedTicket, $originalTicket, $condition)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if ticket meets specified condition.
     *
     * @param array|null $originalTicket
     *
     * @return bool
     */
    public function conditionIsMet(Ticket $updatedTicket, $originalTicket, Condition $condition)
    {
        $operator = $condition['selected_operator'];
        $value    = $condition['pivot']['condition_value'];

        return $this->getCondition($condition->type)->isMet(
            $updatedTicket, $originalTicket, $operator['name'], $value
        );
    }

    /**
     * Filter conditions by specified match type.
     *
     * @param Collection $conditions
     * @param string $matchType
     * @return Collection
     */
    private function filterConditionsByMatchType($conditions, $matchType)
    {
        return $conditions->filter(fn($condition) => $condition['pivot']['match_type'] === $matchType);
    }

    public function getCondition(string $conditionType): BaseCondition
    {
        $className = $this->getConditionClassName($conditionType);

        $folder = ucfirst(explode(':', $conditionType)[0]);

        return App::make('App\Services\Triggers\Conditions\\'.$folder.'\\'.$className);
    }

    private function getConditionClassName(string $conditionType): string
    {
        $conditionType = Str::camel($conditionType);
        $parts = explode(':', $conditionType);
        $parts[1] = ucfirst($parts[1]);
        return ucfirst(implode('', $parts)).'Condition';
    }
}
