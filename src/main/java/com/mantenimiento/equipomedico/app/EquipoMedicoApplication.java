package com.mantenimiento.equipomedico.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages= {"com.mantenimiento.equipomedico.app"})
public class EquipoMedicoApplication {

	public static void main(String[] args) {
		SpringApplication.run(EquipoMedicoApplication.class, args);
	}
}
