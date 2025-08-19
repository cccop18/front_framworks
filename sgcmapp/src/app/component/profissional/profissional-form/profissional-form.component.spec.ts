import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockEspecialidades from '../../../../assets/json/especialidades.json';
import mockProfissionais from '../../../../assets/json/profissionais.json';
import mockUnidades from '../../../../assets/json/unidades.json';
import { routes } from '../../../app.routes';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { ProfissionalService } from '../../../service/profissional.service';
import { UnidadeService } from '../../../service/unidade.service';
import { TestUtils } from '../../../utils/test-utils';
import { ProfissionalFormComponent } from './profissional-form.component';

describe('ProfissionalFormComponent', () => {
  let component: ProfissionalFormComponent;
  let fixture: ComponentFixture<ProfissionalFormComponent>;

  const serviceMock = {
    consultarPorId: jasmine.createSpy('consultarPorId').and.returnValue(of(mockProfissionais[0])),
    salvar: jasmine.createSpy('salvar').and.returnValue(of(mockProfissionais[0]))
  };

  const serviceEspecialidadeMock = {
    consultar: jasmine.createSpy('consultar').and.returnValue(of(mockEspecialidades))
  };

  const serviceUnidadeMock = {
    consultar: jasmine.createSpy('consultar').and.returnValue(of(mockUnidades))
  };

  const mockActivatedRoute = {
    snapshot: {
      queryParamMap: {
        get: jasmine.createSpy('consultarPorId')
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfissionalFormComponent,
        RouterModule.forRoot(routes),
        FormsModule],
      providers: [
        { provide: ProfissionalService, useValue: serviceMock },
        { provide: EspecialidadeService, useValue: serviceEspecialidadeMock },
        { provide: UnidadeService, useValue: serviceUnidadeMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalFormComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockActivatedRoute.snapshot.queryParamMap.get.calls.reset();
    serviceMock.consultarPorId.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar servico.consultarPorId quando id está presente', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue('1');
    component.ngOnInit();
    expect(serviceMock.consultarPorId).toHaveBeenCalledWith(1);
  });

  it('não deve chamar servico.consultarPorId quando id não está presente', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    expect(serviceMock.consultarPorId).not.toHaveBeenCalled();
  });

  it('deve chamar servico.save quando clicar no botão "Salvar"', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue('1');
    component.ngOnInit();
    let botaoSalvar = fixture.nativeElement.querySelector('input[value="Salvar"]');
    botaoSalvar.click();
    expect(serviceMock.salvar).toHaveBeenCalledWith(mockProfissionais.find(item => item.id == 1));
  });

  it('deve mudar a rota ao salvar', async () => {
    let botaoSalvar = fixture.nativeElement.querySelector('input[value="Salvar"]');
    botaoSalvar.click();
    await fixture.whenStable();
    const location: Location = TestBed.inject(Location);
    expect(location.path()).toBeTruthy();
  });

  it('deve definir a propriedade routerLink no botão "Cancelar"', () => {
    let botaoCancelar = fixture.nativeElement.querySelector('input[value="Cancelar"]');
    expect(botaoCancelar.getAttribute('routerLink')).not.toBeNull();
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, ProfissionalFormComponent);
    expect(rota).toBeDefined();
  });

  it('deve listar as opções de especialidade no formulário ao iniciar', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    let select = fixture.nativeElement.querySelector('select#especialidade');
    expect(select).not.toBeNull();
    mockEspecialidades.forEach(especialidade => {
      expect(select.innerHTML).toContain(especialidade.nome);
    });
  });

  it('deve listar as opções de unidade no formulário ao iniciar', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    let select = fixture.nativeElement.querySelector('select#unidade');
    expect(select).not.toBeNull();
    mockUnidades.forEach(unidade => {
      expect(select.innerHTML).toContain(unidade.nome);
    });
  });

  it('deve exibir uma mensagem de confirmação ao salvar ', () => {
    spyOn(window, 'alert');
    let botaoSalvar = fixture.nativeElement.querySelector('input[value="Salvar"]');  
    botaoSalvar.click();
    expect(window.alert).toHaveBeenCalled();
  });
});
