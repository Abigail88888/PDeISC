        import {Alfajor} from "./alfajor.js";
            let alfajor= new Alfajor("Chocolate y dulce de leche", "Terrabussi triple 3x" , "120g" , "1800" );
            console.log(`${alfajor.nombre} precio ${alfajor.precio}`);

            alfajor.precio = 2200;
            console.log(`${alfajor.precio}`);