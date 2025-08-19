package br.ufac.sgcmapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query("""
        SELECT p FROM Paciente p
        WHERE :termoBusca IS NULL
        OR p.nome LIKE %:termoBusca%
        OR p.email LIKE %:termoBusca%
        OR p.telefone LIKE %:termoBusca%
        OR p.cep LIKE %:termoBusca%
        OR p.endereco LIKE %:termoBusca%
    """)
    public List<Paciente> consultar(String termoBusca);
    
}
