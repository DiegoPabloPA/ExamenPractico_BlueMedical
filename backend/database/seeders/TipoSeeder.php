<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tipo;
class TipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tipo::insert([[
            'nombre'=>'Oficial'],[
            'nombre'=>'No Residente'],
            ['nombre'=>'Residente'
        ]]);
    }
}
