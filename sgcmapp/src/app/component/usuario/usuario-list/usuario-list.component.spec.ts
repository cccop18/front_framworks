import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockUsuarios from '../../../../assets/json/usuarios.json';
import { routes } from '../../../app.routes';
import { UsuarioService } from '../../../service/usuario.service';
import { TestUtils } from '../../../utils/test-utils';
import { UsuarioListComponent } from './usuario-list.component';

describe('UsuarioListComponent', () => {
  let component: UsuarioListComponent;
  let fixture: ComponentFixture<UsuarioListComponent>;
  let service: UsuarioService;

  const serviceMock = {
    consultar: jasmine.createSpy('consultar').and.returnValue(of(mockUsuarios)),
    remover: jasmine.createSpy('remover').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsuarioListComponent,
        RouterModule.forRoot(routes)],
      providers: [
        { provide: UsuarioService, useValue: serviceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UsuarioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método "consultar" do serviço ao iniciar', () => {
    expect(service.consultar).toHaveBeenCalled();
  });

  it('deve exibir os nomes dos usuários', () => {
    fixture.detectChanges();
    let linhas = fixture.nativeElement.querySelectorAll('table > tbody > tr');
    linhas.forEach((linha: any, index: any) => {
      const colunaPaciente = linha.cells[1];
      const textoCelula = colunaPaciente.textContent.trim();
      expect(textoCelula).toEqual(mockUsuarios[index].nomeCompleto);
    });
  });

  it('deve exibir o total de registros', () => {
    fixture.detectChanges();
    let totalRegistros = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(totalRegistros.textContent).toContain(mockUsuarios.length);
  });

  it('deve exibir mensagem de nenhum registro encontrado', () => {
    component.registros = [];
    fixture.detectChanges();
    let mensagem = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(mensagem.textContent).toContain('Nenhum registro encontrado');
  });

  it('deve chamar o método "remover" do componente ao clicar em "Excluir"', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'remover').and.callThrough();
    let botoes = fixture.nativeElement.querySelectorAll('a.botao.excluir') as HTMLAnchorElement[];
    botoes.forEach((botao, index) => {
      botao.click();
      expect(component.remover).toHaveBeenCalledWith(mockUsuarios[index].id);
    });
  });

  it('deve chamar o método "remover" do serviço ao remover um registro', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const id = 1;
    component.remover(id);
    expect(service.remover).toHaveBeenCalledWith(id);
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, UsuarioListComponent);
    expect(rota).toBeDefined();
  });

  it('deve ter uma rota que inicia com "config"', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, UsuarioListComponent);
    expect(rota).toContain('config');
  });

  it('deve exibir o BarraComandosComponent', () => {
    let barraComandos = fixture.nativeElement.querySelector('app-barra-comandos');
    expect(barraComandos).toBeTruthy();
  });
});
