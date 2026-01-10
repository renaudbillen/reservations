<?php

namespace App\Enums;

enum PermissionEnum: string
{
    const USER_INDEX = 'user_index';
    const USER_CREATE = 'user_create';
    const USER_EDIT = 'user_edit';
    const USER_DESTROY = 'user_destroy';

    const VACATION_INDEX = 'vacation_index';
    const VACATION_CREATE = 'vacation_create';
    const VACATION_EDIT = 'vacation_edit';
    const VACATION_DESTROY = 'vacation_destroy';
}
