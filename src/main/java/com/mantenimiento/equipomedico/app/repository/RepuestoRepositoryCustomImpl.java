package com.mantenimiento.equipomedico.app.repository;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;

public class RepuestoRepositoryCustomImpl implements RepuestoRepositoryCustom
{
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Repuesto> getRepuestoByFilter(String codigo, String tipo, String marca, String modelo)
	{
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Repuesto> query = cb.createQuery(Repuesto.class);
		Root<Repuesto> repuestoRoot = query.from(Repuesto.class);

		List<Predicate> predicates = new ArrayList<>();

		if(codigo != null) {
			predicates.add(cb.equal(repuestoRoot.get("codigo"), codigo));
		}
		if(tipo != null) {
			predicates.add(cb.equal(repuestoRoot.join("tipoEquipo").get("tipo"), tipo));
		}
		if(marca != null) {
			predicates.add(cb.equal(repuestoRoot.join("modeloEquipo").get("marca"), marca));
		}
		if(modelo != null) {
			predicates.add(cb.equal(repuestoRoot.join("modeloEquipo").get("modelo"), modelo));
		}

		if(predicates.isEmpty()) {
			query.select(repuestoRoot);
		} else {
			query.select(repuestoRoot).where(cb.or(predicates.toArray(new Predicate[predicates.size()])));
		}
		return entityManager.createQuery(query).getResultList();
	}
}
