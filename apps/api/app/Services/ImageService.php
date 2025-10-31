<?php

namespace App\Services;

use App\Enums\UploadImageMode;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function handle(array &$data, array $options): void
    {
        $mode = UploadImageMode::from($options['mode']);
        $imageKey = $options['key'];
        $folder = $options['folder'];
        $existingImage = $options['existing'];

        switch ($mode) {
            case UploadImageMode::UPLOAD:
                if ($existingImage) {
                    Storage::disk('public')->delete($existingImage);
                }
                $data[$imageKey] = $data[$imageKey]?->store($folder, 'public');
                break;

            case UploadImageMode::CLEAR:
                if ($existingImage) {
                    Storage::disk('public')->delete($existingImage);
                }
                $data[$imageKey] = null;
                break;

            case UploadImageMode::KEEP:
                unset($data[$imageKey]);
                break;
        }
    }

    public function uploadMultiple(array &$data, array $options)
    {
        $imagesKey = $options['key'];
        $folder = $options['folder'];
        $imagesIds = [];

        if (isset($data[$imagesKey])) {
            foreach ($data[$imagesKey] as $img) {
                $imagesIds[] = $img->store($folder, "public");
            }
        }
        $data[$imagesKey] = $imagesIds;
    }

    public function HandleMultiple(array &$data, array $options)
    {
        $imagesKey = $options['key'];
        $currentImgIndex = 0;
        $modes = $options['modes'];
        $folder = $options['folder'];
        $existingImages = $options['existing'];
        $resultImgs = [];

        foreach ($modes as $modeData) {
            $mode = UploadImageMode::from($modeData['mode']);

            switch ($mode) {
                case UploadImageMode::UPLOAD:
                    $resultImgs[] = $data[$imagesKey][$currentImgIndex]?->store($folder, 'public');
                    $currentImgIndex++;
                    break;

                case UploadImageMode::CLEAR:
                    if (isset($modeData['id']) && in_array($modeData['id'], $existingImages)) {
                        Storage::disk('public')->delete($modeData['id']);
                    }
                    break;

                case UploadImageMode::KEEP:
                    if (isset($modeData['id']) && in_array($modeData['id'], $existingImages)) {
                        $resultImgs[] = $modeData['id'];
                    }
                    break;
            }
        }

        $data[$imagesKey] = $resultImgs;
    }
}
