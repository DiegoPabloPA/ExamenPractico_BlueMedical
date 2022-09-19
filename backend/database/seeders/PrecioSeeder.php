<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Precio;
class PrecioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Precio::insert([[
            'concepto'=>'minutos',
            'valor'=>0,
            'Tipo_Id'=>1],
            [
                'concepto'=>'minutos',
                'valor'=>0.5,
                'Tipo_Id'=>2],
                [
                    'concepto'=>'minutos',
                    'valor'=>0.05,
                    'Tipo_Id'=>3]]);
    }
}
