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

    const RESERVATION_INDEX = 'reservation_index';
    const RESERVATION_VIEW_ALL = 'reservation_view_all';
    const RESERVATION_CREATE = 'reservation_create';
    const RESERVATION_EDIT = 'reservation_edit';
    const RESERVATION_DESTROY = 'reservation_destroy';
}
