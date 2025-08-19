import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Convenio } from '../model/convenio';
import { ConvenioService } from './convenio.service';

describe('ConvenioService', () => {
  let service: ConvenioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ConvenioService);
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
    const req = httpTestingController.expectOne('http://localhost:9000/convenio/consultar');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultar(termoBusca)', () => {
    service.consultar('teste').subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/convenio/consultar?termoBusca=teste');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método consultarPorId()', () => {
    service.consultarPorId(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/convenio/consultar/1');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto sem id', () => {
    service.salvar(<Convenio>{}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/convenio/inserir');
    expect(req.request.method).toBe('POST');    
  });

  it('deve chamar HttpClient ao executar o método salvar() para um objeto com id', () => {
    service.salvar(<Convenio>{id: 1}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/convenio/atualizar');
    expect(req.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método remover()', () => {
    service.remover(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/convenio/remover/1');
    expect(req.request.method).toBe('DELETE');
  });
});
