<?php

namespace App\Enums;

enum UploadImageMode: string
{
    case UPLOAD = 'upload';
    case CLEAR = 'clear';
    case KEEP = 'keep';
}
