import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocketWindowComponent } from './web-socket-window.component';

describe('WebSocketWindowComponent', () => {
  let component: WebSocketWindowComponent;
  let fixture: ComponentFixture<WebSocketWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSocketWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSocketWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
