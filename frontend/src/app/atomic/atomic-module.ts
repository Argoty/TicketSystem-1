import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, User, Lock, Eye } from 'lucide-angular';

import { ButtonComponent } from './atoms/button/button';
import { IconButtonMolecule } from './molecules/button-icon/button-icon';
import { IconComponent } from './atoms/icon/icon';
import { InputComponent } from './atoms/input/input';
import { LoginFormComponent } from './molecules/login-form/login-form';
import { LoginLayoutComponent } from './templates/login-layout/login-layout';
import { LoginPageComponent } from './pages/login-page/login-page';
import { FloatingInputComponent } from './atoms/floating-input/floating-input';
import { StatusBadgeComponent } from './atoms/status-badge/status-badge';
import { TextareaComponent } from './atoms/textarea/textarea';
import { AvatarComponent } from './atoms/avatar/avatar';
import { TextLinkComponent } from './atoms/text-link/text-link';
import { CommentFormComponent } from './molecules/comment-form/comment-form';
import { NotificationBellComponent } from './molecules/notification-bell/notification-bell';
import { TicketCardComponent } from './molecules/ticket-card/ticket-card';
import { TicketMetaInfoComponent } from './molecules/ticket-meta-info/ticket-meta-info';
import { CommentItemComponent } from './molecules/comment-item/comment-item';
import { CommentsSectionComponent } from './organisms/comments-section/comments-section';
import { CreateTicketModalComponent } from './organisms/create-ticket-modal/create-ticket-modal';
import { TicketInfoComponent } from './organisms/ticket-info/ticket-info';
import { DashboardLayoutComponent } from './templates/dashboard-layout/dashboard-layout';
import { TicketLayoutComponent } from './templates/ticket-layout/ticket-layout';
import { ProfilePageComponent } from './pages/profile-page/profile-page';
import { UserDashboardPageComponent } from './pages/user-dashboard-page/user-dashboard-page';
import { TicketPageComponent } from './pages/ticket-page/ticket-page';

@NgModule({
  declarations: [
    ButtonComponent,
    IconComponent,
    InputComponent,
    IconButtonMolecule,
    LoginFormComponent,
    LoginLayoutComponent,
    LoginPageComponent,
    FloatingInputComponent,
    StatusBadgeComponent,
    TextareaComponent,
    AvatarComponent,
    TextLinkComponent,
    CommentFormComponent,
    NotificationBellComponent,
    TicketCardComponent,
    TicketCardComponent,
    CommentItemComponent,
    TicketMetaInfoComponent,
    CommentsSectionComponent,
    CreateTicketModalComponent,
    TicketInfoComponent,
    DashboardLayoutComponent,
    TicketLayoutComponent,
    ProfilePageComponent,
    UserDashboardPageComponent,
    TicketPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LucideAngularModule.pick({User, Mail, Lock, Eye}),
  ],
  exports: [
    ButtonComponent,
    IconComponent,
    IconButtonMolecule,
    InputComponent,
    LoginFormComponent,
    LoginLayoutComponent,
    FloatingInputComponent,
    StatusBadgeComponent,
    TextareaComponent,
    AvatarComponent,
    TextLinkComponent,
    CommentFormComponent,
    NotificationBellComponent,
    TicketCardComponent,
    TicketCardComponent,
    CommentItemComponent,
    TicketMetaInfoComponent,
    CommentsSectionComponent,
    CreateTicketModalComponent,
    TicketInfoComponent,
    DashboardLayoutComponent,
    TicketLayoutComponent,
    ProfilePageComponent,
    UserDashboardPageComponent,
    TicketPageComponent
  ]
})
export class AtomicModule {}
