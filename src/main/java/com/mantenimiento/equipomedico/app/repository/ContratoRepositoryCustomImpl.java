package com.mantenimiento.equipomedico.app.repository;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.mantenimiento.equipomedico.app.entidad.Contrato;

public class ContratoRepositoryCustomImpl implements ContratoRepositoryCustom
{
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Contrato> getContratoByFilter(
		String numeroContrato, String tipoProcedimiento, String estadoContrato)
	{
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Contrato> query = cb.createQuery(Contrato.class);
		Root<Contrato> contratoRoot = query.from(Contrato.class);

		List<Predicate> predicates = new ArrayList<>();

		if(estadoContrato != null) {
			predicates.add(cb.equal(contratoRoot.get("estadoContrato"), estadoContrato));
		}
		if(numeroContrato != null) {
			predicates.add(cb.equal(contratoRoot.get("numeroContrato"), numeroContrato));
		}
		if(tipoProcedimiento != null) {
			predicates.add(cb.equal(contratoRoot.get("tipoProcedimiento"), tipoProcedimiento));
		}

		if(predicates.isEmpty()) {
			query.select(contratoRoot);
		} else {
			query.select(contratoRoot).where(cb.or(predicates.toArray(new Predicate[predicates.size()])));
		}
		return entityManager.createQuery(query).getResultList();
	}
}
