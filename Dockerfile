FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Install Node.js manually (v20 here)
ADD https://nodejs.org/dist/v20.12.0/node-v20.12.0-x64.msi node.msi
RUN start /wait msiexec /i node.msi /quiet && del node.msi

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json ./
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install

# Generate Prisma client
RUN cd packages/db && npx prisma generate && cd ../..

# Only build user-app
RUN npx turbo run build --filter=user-app

CMD ["npm", "run", "start-user-app"]
