package br.ufac.sgcmapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.ufac.sgcmapi.model.Profissional;
import br.ufac.sgcmapi.repository.ProfissionalRepository;

@Service
public class ProfissionalService implements ICrudService<Profissional> {

    private final ProfissionalRepository repo;

    public ProfissionalService(ProfissionalRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Profissional> consultar(String termoBusca) {
        return repo.consultar(StringUtils.trimAllWhitespace(termoBusca));
    }

    @Override
    public Profissional consultar(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Profissional salvar(Profissional objeto) {
        return repo.save(objeto);
    }

    @Override
    public void remover(Long id) {
        repo.deleteById(id);
    }
    
}
