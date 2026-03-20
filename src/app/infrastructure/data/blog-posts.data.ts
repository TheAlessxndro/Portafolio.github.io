import { BlogPost } from '../../domain/blog/entities/blog-post.entity';

/**
 * Static blog posts data
 */
export const BLOG_POSTS_DATA: BlogPost[] = [
  new BlogPost(
    'clean-architecture-angular',
    'Implementando Clean Architecture en Angular',
    'Aprende cómo estructurar tus proyectos Angular usando principios de arquitectura limpia y DDD para crear aplicaciones mantenibles y escalables.',
    `
## Introducción

La arquitectura limpia es un enfoque de diseño de software que separa las preocupaciones en capas bien definidas. En este artículo, exploraremos cómo aplicar estos principios en proyectos Angular.

## ¿Por qué Clean Architecture?

- **Independencia de frameworks**: El negocio no depende de Angular
- **Testabilidad**: Fácil de probar cada capa de forma aislada
- **Mantenibilidad**: Cambios localizados y predecibles
- **Escalabilidad**: Fácil agregar nuevas funcionalidades

## Estructura de capas

### Domain Layer
Contiene las entidades y reglas de negocio puras.

### Application Layer
Orquesta los casos de uso y coordina el flujo de datos.

### Infrastructure Layer
Implementa los detalles técnicos (APIs, base de datos, etc.).

### Presentation Layer
Maneja la UI y la interacción con el usuario.

## Conclusión

Aplicar Clean Architecture requiere más código inicial, pero los beneficios a largo plazo son significativos para proyectos que necesitan escalar.
    `,
    'assets/images/angular.png',
    new Date('2024-01-15'),
    ['Angular', 'Arquitectura', 'DDD', 'Clean Code'],
    8,
    'clean-architecture-angular'
  ),
  new BlogPost(
    'laravel-api-best-practices',
    'Mejores Prácticas para APIs RESTful con Laravel',
    'Guía completa sobre cómo diseñar y desarrollar APIs RESTful profesionales usando Laravel, incluyendo autenticación, validación y documentación.',
    `
## Introducción

Laravel es uno de los frameworks más populares para crear APIs RESTful. En este artículo, cubriremos las mejores prácticas para desarrollar APIs profesionales.

## Estructura del Proyecto

Organiza tu código siguiendo el patrón Repository para mantener los controladores limpios.

## Autenticación

Usa Laravel Sanctum o Passport para manejar la autenticación de forma segura.

## Validación

Siempre valida los datos de entrada usando Form Requests.

## Respuestas Consistentes

Usa API Resources para formatear las respuestas de manera consistente.

## Conclusión

Siguiendo estas prácticas, tus APIs serán más mantenibles y fáciles de consumir.
    `,
    'assets/images/laravel.png',
    new Date('2024-02-20'),
    ['Laravel', 'PHP', 'API REST', 'Backend'],
    10,
    'laravel-api-best-practices'
  ),
  new BlogPost(
    'signals-angular',
    'Angular Signals: El Futuro de la Reactividad',
    'Descubre cómo los Signals de Angular simplifican la gestión del estado y mejoran el rendimiento de tus aplicaciones.',
    `
## ¿Qué son los Signals?

Los Signals son una nueva primitiva reactiva en Angular que permite rastrear cambios de estado de forma más eficiente.

## Ventajas sobre RxJS

- Sintaxis más simple
- Mejor rendimiento
- Detección de cambios más granular
- Curva de aprendizaje más suave

## Ejemplo Básico

Los Signals se crean con la función signal() y se actualizan con set() o update().

## Computed Signals

Usa computed() para derivar valores de otros signals automáticamente.

## Conclusión

Los Signals representan el futuro de la reactividad en Angular y vale la pena empezar a usarlos hoy.
    `,
    'assets/images/angular.png',
    new Date('2024-03-10'),
    ['Angular', 'Signals', 'Reactividad', 'Frontend'],
    6,
    'signals-angular'
  )
];
