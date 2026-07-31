import './style.css'
import { initializeRequestAccess } from './request-access/controller.ts'
import { unavailableRequestAccessService } from './request-access/unavailable-service.ts'

initializeRequestAccess(document, unavailableRequestAccessService)
