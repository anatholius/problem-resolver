<?php
/**
 * EntityHelper.php - powered by PhpStorm
 *
 * Idea & Mind of Anatol Derbisz
 * Copyright(c) 2019 by Anatholius Programowanie <biuro@anatholius.pro>
 * Made with passion in Wrocław
 *
 * On: 02-08-2019 10:35:49
 */

namespace App\Helper;


use function array_reduce;
use function floor;

class EntityHelper
{
    
    public static function getIdFromIRI($iri): int
    {
        $parts = explode('/', $iri);
        
        return (int)array_pop($parts);
    }
    
    public static function countItemsForColumn(array $items, int $column, string $field, bool $json = true): ?array
    {
        return (array_reduce($items, function ($total, $item) use ($column, $field) {
            if ($item['economicOperation']->getBookColumn() === 'col' . $column) {
                return [
                    'unit' => $total['unit'] + $item[$field]['unit'] + floor($item[$field]['penny'] / 100),
                    'penny' => $total['penny'] + $item[$field]['penny'] - floor(($total['penny'] +
                                $item[$field]['penny']) /
                            100) * 100,
                ];
            } else {
                return ['unit' => $total['unit'], 'penny' => $total['penny']];
            }
        }, [
            'unit' => 0,
            'penny' => 0,
        ]));
    }
    
    public static function sumJsons(array $val1, array $val2)
    {
        return [
            'unit' => $val1['unit'] + $val2['unit'] + floor($val2['penny'] / 100),
            'penny' => $val1['penny'] + $val2['penny'] - floor(($val1['penny'] + $val2['penny']) / 100) * 100,
        ];
    }
    
    public static function equalsJsons(array $val1, array $val2)
    {
        return $val1['unit'] === $val2['unit'] && $val1['penny'] === $val2['penny'];
    }
    
    public static function subtractJsons(array $val1, array $val2)
    {
        $val100 = $val1['unit'] * 100 + $val1['penny'] * 100;
        $val200 = $val2['unit'] * 100 + $val2['penny'] * 100;
        $subtract = $val100 - $val200;
        
        return [
            'unit' => floor($subtract / 100),
            'penny' => $subtract - floor($subtract / 100) * 100,
        ];
    }
    
    public static function summarizeSettlementStartArray()
    {
        $array = [];
        for ($i = 7; $i <= 14; $i++) {
            $array['col' . $i] = ['unit' => 0, 'penny' => 0];
        }
        
        return $array;
    }
}