import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Unidade } from '../model/unidade';
import { UnidadeService } from './unidade.service';

describe('UnidadeService', () => {
  let service: UnidadeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UnidadeService);
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
    const req = httpTestingController.expectOne('http://localhost:9000/config/unidade/consultar');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultar(termoBusca)', () => {
    service.consultar('teste').subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/unidade/consultar?termoBusca=teste');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultarPorId()', () => {
    service.consultarPorId(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/unidade/consultar/1');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto sem id', () => {
    service.salvar(<Unidade>{}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/unidade/inserir');
    expect(req.request.method).toBe('POST');    
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto com id', () => {
    service.salvar(<Unidade>{id: 1}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/unidade/atualizar');
    expect(req.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método remover()', () => {
    service.remover(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/unidade/remover/1');
    expect(req.request.method).toBe('DELETE');
  });
});
