import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    CheckboxModule,
    ButtonModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {
  private readonly fb = inject(FormBuilder);
  submitting = signal(false);
  submitted = signal(false);

  channels = [
    { icon: 'pi pi-envelope', title: 'Email Us', desc: 'Our team is ready to assist.', linkText: 'abc@example.com', href: 'mailto:abc@example.com' },
    { icon: 'pi pi-comments', title: 'Live Chat Support', desc: 'Reach out for quick help.', linkText: 'Start a new chat', href: '#' },
    { icon: 'pi pi-map-marker', title: 'Visit Us', desc: 'Drop by our office for a chat.', linkText: '1234 Street Name, City Name', href: '#' },
    { icon: 'pi pi-phone', title: 'Call Us', desc: "We're available Mon–Fri, 9am–5pm.", linkText: '+123 456 7890', href: 'tel:+1234567890' }
  ];

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    message: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
    }, 1200);
  }

  resetForm() {
    this.form.reset();
    this.submitted.set(false);
  }
}
