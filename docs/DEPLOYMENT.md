# Deployment Guide

This guide covers deploying FullStack Studio to production.

## Deployment Options

### Option 1: Vercel + Railway (Recommended)

**Best for:** Production deployments with automatic scaling

- **Frontend (Vercel):** Zero-config Next.js deployment
- **Backend (Railway):** Managed Node.js + PostgreSQL

#### Step 1: Deploy Frontend to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Web App**
```bash
cd apps/web
vercel --prod
```

3. **Configure Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_API_URL` (your Railway API URL)
   - `DATABASE_URL`

#### Step 2: Deploy Backend to Railway

1. **Sign up at** https://railway.app

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your Fullstack repository
   - Select `apps/api` as root directory

3. **Add PostgreSQL**
   - Click "New" → "Database" → "PostgreSQL"
   - Copy the DATABASE_URL

4. **Configure Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://...
   CLERK_SECRET_KEY=sk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   OPENAI_API_KEY=sk-...
   GITHUB_TOKEN=ghp_...
   VERCEL_TOKEN=...
   ```

5. **Deploy**
   - Railway will auto-deploy on every push to main

### Option 2: Docker + DigitalOcean

**Best for:** Full control and custom infrastructure

#### Prerequisites
- Docker installed
- DigitalOcean account
- Domain name (optional)

#### Step 1: Build Docker Images

```bash
# Build all images
docker-compose build

# Or build individually
docker build -t fullstack-web -f apps/web/Dockerfile .
docker build -t fullstack-api -f apps/api/Dockerfile .
```

#### Step 2: Push to Registry

```bash
# Tag images
docker tag fullstack-web registry.digitalocean.com/your-registry/web:latest
docker tag fullstack-api registry.digitalocean.com/your-registry/api:latest

# Push
docker push registry.digitalocean.com/your-registry/web:latest
docker push registry.digitalocean.com/your-registry/api:latest
```

#### Step 3: Deploy to DigitalOcean

1. **Create Droplet**
   - Choose Ubuntu 22.04
   - At least 2GB RAM
   - Add SSH key

2. **SSH into Droplet**
```bash
ssh root@your-droplet-ip
```

3. **Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

4. **Clone Repository**
```bash
git clone https://github.com/brandonlacoste9-tech/Fullstack.git
cd Fullstack
```

5. **Create .env Files**
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
# Edit with production values
```

6. **Start Services**
```bash
docker-compose up -d
```

#### Step 4: Configure Nginx (Optional)

```bash
# Install Nginx
apt update && apt install nginx -y

# Create config
nano /etc/nginx/sites-available/fullstack
```

Add configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
ln -s /etc/nginx/sites-available/fullstack /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### Step 5: SSL with Let's Encrypt

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option 3: AWS (Advanced)

**Best for:** Enterprise deployments with high traffic

- **Frontend:** S3 + CloudFront
- **Backend:** ECS or Lambda
- **Database:** RDS PostgreSQL
- **Cache:** ElastiCache Redis

See [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md) for detailed instructions.

## Mobile App Deployment

### iOS App Store

1. **Build for iOS**
```bash
cd apps/mobile
expo build:ios
```

2. **Submit to App Store**
   - Use Xcode or Application Loader
   - Follow Apple's submission guidelines

### Google Play Store

1. **Build for Android**
```bash
cd apps/mobile
expo build:android -t app-bundle
```

2. **Submit to Play Store**
   - Upload AAB to Play Console
   - Fill out store listing
   - Submit for review

### Over-the-Air Updates (Expo)

```bash
# Publish update
cd apps/mobile
expo publish

# Users will receive updates automatically
```

## CI/CD Setup

### GitHub Actions (Already Configured!)

The repository includes `.github/workflows/ci-cd.yml` that:

1. **Runs on every push** to main or staging
2. **Runs tests** and linting
3. **Builds Docker images**
4. **Deploys to staging** (staging branch)
5. **Deploys to production** (main branch)

#### Required GitHub Secrets

Add these in Settings → Secrets:

```
DOCKER_USERNAME
DOCKER_PASSWORD
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
CLERK_SECRET_KEY
STRIPE_SECRET_KEY
OPENAI_API_KEY
SLACK_WEBHOOK_URL (optional)
EXPO_TOKEN (for mobile builds)
```

### Manual Deployment

```bash
# Deploy staging
git push origin staging

# Deploy production
git push origin main
```

## Environment-Specific Configuration

### Development
```bash
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/fullstack_dev
```

### Staging
```bash
NODE_ENV=staging
DATABASE_URL=postgresql://staging-db:5432/fullstack_staging
```

### Production
```bash
NODE_ENV=production
DATABASE_URL=postgresql://prod-db:5432/fullstack_prod
```

## Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] Database migrations run successfully
- [ ] API health check returns 200
- [ ] Frontend loads without errors
- [ ] Authentication flow works
- [ ] Payment processing works (test mode first!)
- [ ] GitHub integration connects
- [ ] Vercel deployments work
- [ ] Mobile app connects to API
- [ ] SSL certificate installed
- [ ] Monitoring and alerts configured
- [ ] Backups scheduled

## Monitoring

### Health Checks

```bash
# API health
curl https://api.yourdomain.com/health

# Expected response
{"status":"ok","version":"1.0.0"}
```

### Logging

- **Vercel:** Built-in logging dashboard
- **Railway:** View logs in dashboard
- **Docker:** `docker-compose logs -f`

### Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- DataDog for infrastructure monitoring

## Scaling

### Horizontal Scaling

```bash
# Scale API containers
docker-compose up -d --scale api=3
```

### Database

- Use connection pooling (PgBouncer)
- Enable read replicas
- Consider database sharding for >1M users

### CDN

- Use Vercel's built-in CDN
- Or CloudFlare for additional caching

## Backup & Recovery

### Database Backups

```bash
# Automated daily backups
0 2 * * * pg_dump fullstack > /backups/fullstack_$(date +\%Y\%m\%d).sql
```

### Disaster Recovery

1. Keep database backups in multiple regions
2. Document restore procedures
3. Test recovery quarterly
4. Keep infrastructure as code (IaC)

## Security Checklist

- [ ] Environment variables not committed
- [ ] HTTPS enforced everywhere
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection headers set
- [ ] Webhook signatures verified
- [ ] API keys rotated regularly
- [ ] Dependencies updated regularly

## Troubleshooting

### 502 Bad Gateway

- Check API is running
- Verify proxy configuration
- Check firewall rules

### Database Connection Errors

- Verify DATABASE_URL
- Check firewall allows connections
- Ensure database is running

### Out of Memory

- Increase container memory
- Check for memory leaks
- Enable swap space

## Support

Need help with deployment?

- 📧 Email: devops@fullstack.studio
- 💬 Discord: https://discord.gg/fullstack
- 📞 Enterprise Support: Available for Enterprise plan

---

**Next:** [Monitoring Guide](./MONITORING.md)
