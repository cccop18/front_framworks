import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockPacientes from '../../../../assets/json/pacientes.json';
import { routes } from '../../../app.routes';
import { PacienteService } from '../../../service/paciente.service';
import { TestUtils } from '../../../utils/test-utils';
import { PacienteFormComponent } from './paciente-form.component';

describe('PacienteFormComponent', () => {
  let component: PacienteFormComponent;
  let fixture: ComponentFixture<PacienteFormComponent>;

  const serviceMock = {
    consultarPorId: jasmine.createSpy('consultarPorId').and.returnValue(of(mockPacientes[0])),
    salvar: jasmine.createSpy('salvar').and.returnValue(of(mockPacientes[0]))
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
        PacienteFormComponent,
        RouterModule.forRoot(routes),
        FormsModule],
      providers: [
        { provide: PacienteService, useValue: serviceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteFormComponent);
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
    expect(serviceMock.salvar).toHaveBeenCalledWith(mockPacientes.find(item => item.id == 1));
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
    const rota = TestUtils.encontrarRotaDoComponente(routes, PacienteFormComponent);
    expect(rota).toBeDefined();
  });

  it('deve exibir uma mensagem de confirmação ao salvar ', () => {
    spyOn(window, 'alert');
    let botaoSalvar = fixture.nativeElement.querySelector('input[value="Salvar"]');  
    botaoSalvar.click();
    expect(window.alert).toHaveBeenCalled();
  });
});
