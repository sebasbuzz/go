<?php namespace App\Http\Requests;

use Common\Core\BaseFormRequest;

class ModifyCategories extends BaseFormRequest
{
    public function rules(): array
    {
        $rules = [
            'name' => 'string|min:2|max:250',
            'parent_id' => 'integer|nullable',
            'description' => 'min:2|nullable',
            'visible_to_role' => 'int|nullable',
            'managed_by_role' => 'int|nullable',
        ];

        if ($this->method() === 'POST') {
            $rules['name'] = 'required|' . $rules['name'];
        }

        return $rules;
    }
}
