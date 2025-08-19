package br.ufac.sgcmapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Convenio;

public interface ConvenioRepository extends JpaRepository<Convenio, Long> {

    @Query("""
        SELECT c FROM Convenio c
        WHERE :termoBusca IS NULL
        OR c.nome LIKE %:termoBusca%
        OR c.razaoSocial LIKE %:termoBusca%
        OR c.cnpj LIKE %:termoBusca%
        OR c.representante LIKE %:termoBusca%
        OR c.email LIKE %:termoBusca%
        OR c.telefone LIKE %:termoBusca%
    """)
    public List<Convenio> consultar(String termoBusca);

    public List<Convenio> findByAtivo(boolean ativo);
    
}
