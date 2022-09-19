<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TipoSeeder::class);
        $this->call(PrecioSeeder::class);
        $this->call(UsuarioSeeder::class);

    }
}
