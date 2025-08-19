package br.ufac.sgcmapi.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.EStatus;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    @Query("""
        SELECT a FROM Atendimento a
        LEFT JOIN Profissional p ON p = a.profissional
        LEFT JOIN Paciente pa ON pa = a.paciente
        LEFT JOIN Convenio c ON c = a.convenio
        LEFT JOIN Unidade u ON u = p.unidade
        WHERE (:termoBusca IS NULL
        OR p.nome LIKE %:termoBusca%
        OR pa.nome LIKE %:termoBusca%
        OR c.nome LIKE %:termoBusca%
        OR u.nome LIKE %:termoBusca%)
        AND (:status IS NULL OR a.status IN :status)
    """)
    List<Atendimento> consultar(String termoBusca, List<EStatus> status);

    @Query("""
        SELECT a.hora FROM Atendimento a
        WHERE a.profissional.id = :id
        AND a.data = :data
        AND a.status <> 'CANCELADO'
    """)
    public List<LocalTime> consultarHorariosOcupadosProfissional(Long id, LocalDate data);

    @Query("""
        SELECT a.hora FROM Atendimento a
        WHERE a.paciente.id = :id
        AND a.data = :data
        AND a.status <> 'CANCELADO'
    """)
    public List<LocalTime> consultarHorariosOcupadosPaciente(Long id, LocalDate data);
    
}
