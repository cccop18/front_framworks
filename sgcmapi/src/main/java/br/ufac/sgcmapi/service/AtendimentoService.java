package br.ufac.sgcmapi.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.EStatus;
import br.ufac.sgcmapi.repository.AtendimentoRepository;

@Service
public class AtendimentoService implements ICrudService<Atendimento> {

    private final AtendimentoRepository repo;

    public AtendimentoService(AtendimentoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Atendimento> consultar(String termoBusca) {
        return repo.consultar(StringUtils.trimAllWhitespace(termoBusca), null);
    }

    public List<Atendimento> consultar(String termoBusca, List<EStatus> status) {
        return repo.consultar(StringUtils.trimAllWhitespace(termoBusca), status);
    }

    @Override
    public Atendimento consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Atendimento salvar(Atendimento objeto) {
        return repo.save(objeto);
    }

    @Override
    public void remover(Long id) {
        var registro = this.consultar(id);
        if (registro != null) {
            registro.setStatus(EStatus.CANCELADO);
            this.salvar(registro);
        }
    }

    public Atendimento atualizarStatus(Long id) {
        var registro = this.consultar(id);
        if (registro != null) {
            var novoStatus = registro.getStatus().proximo();
            registro.setStatus(novoStatus);
            registro = this.salvar(registro);
        }
        return registro;
    }

    public List<LocalTime> consultarHorariosOcupadosProfissional(Long id, LocalDate data) {
        return repo.consultarHorariosOcupadosProfissional(id, data);
    }

    public List<LocalTime> consultarHorariosOcupadosPaciente(Long id, LocalDate data) {
        return repo.consultarHorariosOcupadosPaciente(id, data);
    }
    
}
