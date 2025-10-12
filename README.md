# MS-39 Viewer

Una plataforma web estática profesional para visualizar estudios corneales interactivos generados con Plotly.

## 🌟 Características

- **Visualizaciones Interactivas**: Gráficos 3D con Plotly embebidos en iframes
- **Galería con Filtros**: Búsqueda y filtrado por tipo, clase y fila
- **Diseño Responsivo**: Optimizado para escritorio y móvil
- **Modo Oscuro**: Cambio automático o manual con persistencia de preferencias
- **Accesibilidad**: Cumple con estándares WCAG 2.1 AA
- **Sin Dependencias**: HTML, CSS y JavaScript vanilla

## 📂 Estructura del Proyecto

```
.
├── index.html              # Página de inicio
├── studies.html            # Galería de estudios
├── viewer.html             # Visor de gráficos individuales
├── about.html              # Información y privacidad
├── assets/
│   ├── styles.css          # Estilos personalizados
│   ├── app.js              # Lógica de la aplicación
│   └── favicon.svg         # Icono del sitio
├── reports/
│   └── figs_html/          # Archivos HTML de Plotly
│       ├── Croissant_4.html
│       ├── DUCK_4.html
│       ├── NIPPLE_4.html
│       ├── SNOWMAN_4.html
│       └── nipple+anillo.html
└── README.md
```

## 🚀 Despliegue

### GitHub Pages

1. **Habilitar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Navega a `Settings` > `Pages`
   - En "Source", selecciona la rama `main` y carpeta `/ (root)`
   - Haz clic en "Save"

2. **Acceder al sitio**:
   - Tu sitio estará disponible en: `https://[tu-usuario].github.io/[nombre-repo]/`
   - Por ejemplo: `https://4bm4.github.io/Graphs_examples/`

3. **Configuración personalizada** (opcional):
   - Puedes usar un dominio personalizado siguiendo las [instrucciones de GitHub](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Netlify

1. **Despliegue desde Git**:
   ```bash
   # Instala Netlify CLI (opcional)
   npm install -g netlify-cli
   
   # Inicia sesión
   netlify login
   
   # Despliega
   netlify deploy --prod
   ```

2. **Despliegue desde la interfaz web**:
   - Ve a [netlify.com](https://netlify.com) e inicia sesión
   - Haz clic en "Add new site" > "Import an existing project"
   - Conecta tu repositorio de GitHub
   - Configuración de build:
     - Build command: (dejar vacío)
     - Publish directory: `/` (raíz)
   - Haz clic en "Deploy site"

3. **Configuración**:
   - El sitio estará disponible en una URL tipo: `https://[nombre-aleatorio].netlify.app`
   - Puedes personalizar el nombre en "Site settings" > "Change site name"

### Vercel

1. **Despliegue desde CLI**:
   ```bash
   # Instala Vercel CLI
   npm install -g vercel
   
   # Despliega
   vercel --prod
   ```

2. **Despliegue desde la interfaz web**:
   - Ve a [vercel.com](https://vercel.com) e inicia sesión
   - Haz clic en "Add New" > "Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un sitio estático
   - Haz clic en "Deploy"

### Servidor Web Tradicional

Para desplegar en un servidor web estándar (Apache, Nginx, etc.):

1. **Sube los archivos**:
   ```bash
   # Via FTP/SFTP o rsync
   rsync -avz --exclude='.git' ./ usuario@servidor:/ruta/al/sitio/
   ```

2. **Configuración de Nginx**:
   ```nginx
   server {
       listen 80;
       server_name tudominio.com;
       root /ruta/al/sitio;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

3. **Configuración de Apache**:
   ```apache
   <VirtualHost *:80>
       ServerName tudominio.com
       DocumentRoot /ruta/al/sitio
       
       <Directory /ruta/al/sitio>
           Options -Indexes +FollowSymLinks
           AllowOverride None
           Require all granted
       </Directory>
   </VirtualHost>
   ```

## 🔧 Desarrollo Local

Para probar el sitio localmente:

```bash
# Opción 1: Python (Python 3)
python -m http.server 8000

# Opción 2: Python 2
python -m SimpleHTTPServer 8000

# Opción 3: Node.js con http-server
npx http-server -p 8000

# Opción 4: PHP
php -S localhost:8000
```

Luego abre tu navegador en `http://localhost:8000`

## 📝 Añadir Nuevos Gráficos

Para añadir nuevas visualizaciones:

1. **Coloca el archivo HTML de Plotly** en `reports/figs_html/`

2. **Actualiza el array CHARTS_DATA** en `assets/app.js`:
   ```javascript
   {
     id: 'mi_nuevo_grafico',           // ID único (sin .html)
     filename: 'mi_nuevo_grafico.html', // Nombre del archivo
     title: 'Fila X',                   // Título mostrado
     rowIndex: X,                       // Índice numérico
     class: 'nombre_clase',             // Clase/categoría
     type: 'quad'                       // Tipo de gráfico
   }
   ```

3. **Si añades una nueva clase**, actualiza los estilos de badges en `assets/styles.css`:
   ```css
   .badge-nueva_clase { background-color: #color; color: #texto; }
   [data-theme="dark"] .badge-nueva_clase { background-color: #color; color: #texto; }
   ```

## 🎨 Personalización

### Colores

Edita las variables CSS en `assets/styles.css`:

```css
:root {
  --accent-primary: #3b82f6;  /* Color principal */
  --accent-hover: #2563eb;    /* Color hover */
  /* ... más variables */
}
```

### Fuentes

Cambia la fuente en `assets/styles.css`:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...;
}
```

## 🔒 Privacidad

- No se recopilan datos de usuarios
- No se utilizan cookies de seguimiento
- localStorage solo guarda la preferencia del tema
- Todas las visualizaciones son anónimas (sin patient_ID)
- Los iframes usan `referrerpolicy="no-referrer"`

## 📄 Licencia

Este proyecto está disponible como código abierto. Consulta el archivo LICENSE para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Para reportar problemas o sugerencias, abre un issue en GitHub.
