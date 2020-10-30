module.exports = {
  apps: [
    {
      name: 'zoho backend',
      script: 'npm start',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_test: {
        NODE_ENV: 'test',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    development: {
      user: 'ubuntu',
      host: '13.232.120.225',
      ref: 'origin/master',
      key: '/Users/rajarajanlearnyst/Downloads/zoho.pem',
      repo: 'https://github.com/RajuRajan/Zoho-App-BE.git',
      path: '/var/www/production/zoho-be',
      'post-deploy':
        'sudo npm install && npm run db:migrate --env production && sudo pm2 reload ecosystem.config.js --env production',
    },
    production: {
      user: 'root',
      host: '13.232.120.225',
      ref: 'origin/master',
      repo: 'git@github.com:RajuRajan/Zoho-App-BE.git',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      path: '/var/www/production/zoho-be',
      'post-deploy':
        'sudo npm install && npm run db:migrate --env production && sudo pm2 reload ecosystem.config.js --env production',
    },
  },
};
