<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Precio extends Model
{
    use HasFactory;
    protected $table="precio";
    protected $fillable=[
        "id",
        "concepto",
        "valor",
        "Tipo_Id"
    ];

    public function Tipo(){
        return $this->belongsTo(Tipo::class);
    }
}
