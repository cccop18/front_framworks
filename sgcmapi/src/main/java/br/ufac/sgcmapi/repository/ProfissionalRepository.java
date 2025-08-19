package br.ufac.sgcmapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Profissional;

public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {

    @Query("""
        SELECT p FROM Profissional p
        LEFT JOIN Especialidade e ON e = p.especialidade
        LEFT JOIN Unidade u ON u = p.unidade
        WHERE :termoBusca IS NULL
        OR p.nome LIKE %:termoBusca%
        OR p.registroConselho LIKE %:termoBusca%
        OR p.telefone LIKE %:termoBusca%
        OR p.email LIKE %:termoBusca%
        OR e.nome LIKE %:termoBusca%
        OR u.nome LIKE %:termoBusca%
    """)
    public List<Profissional> consultar(String termoBusca);
    
}
