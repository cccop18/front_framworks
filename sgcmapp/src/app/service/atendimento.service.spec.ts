import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Atendimento } from '../model/atendimento';
import { AtendimentoService } from './atendimento.service';

describe('AtendimentoService', () => {
  let service: AtendimentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AtendimentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar HttpClient ao executar o método consultar()', () => {
    service.consultar().subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/atendimento/consultar');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultar(termoBusca)', () => {
    service.consultar('teste').subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/atendimento/consultar?termoBusca=teste');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultarPorId()', () => {
    service.consultarPorId(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/atendimento/consultar/1');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto sem id', () => {
    service.salvar(<Atendimento>{}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/atendimento/inserir');
    expect(req.request.method).toBe('POST');    
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto com id', () => {
    service.salvar(<Atendimento>{id: 1}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/atendimento/atualizar');
    expect(req.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método remover()', () => {
    service.remover(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/atendimento/remover/1');
    expect(req.request.method).toBe('DELETE');
  });
});
