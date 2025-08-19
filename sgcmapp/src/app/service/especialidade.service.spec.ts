import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Especialidade } from '../model/especialidade';
import { EspecialidadeService } from './especialidade.service';

describe('EspecialidadeService', () => {
  let service: EspecialidadeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(EspecialidadeService);
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
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/consultar');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultar(termoBusca)', () => {
    service.consultar('teste').subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/consultar?termoBusca=teste');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultarPorId()', () => {
    service.consultarPorId(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/consultar/1');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto sem id', () => {
    service.salvar(<Especialidade>{}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/inserir');
    expect(req.request.method).toBe('POST');    
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto com id', () => {
    service.salvar(<Especialidade>{id: 1}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/atualizar');
    expect(req.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método remover()', () => {
    service.remover(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/remover/1');
    expect(req.request.method).toBe('DELETE');
  });
});
