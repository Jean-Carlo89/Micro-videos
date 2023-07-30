FROM node:14.17.0-slim


RUN npm install -g @nestjs/cli@8.2.5 npm@8.5.5
# Install 'tail' utility
# it seems that this node version 14.15.4-slim does not gave tail anymore
# RUN apt-get update && apt-get install -y tail


WORKDIR /home/node/app

# # Copy the script into the image
COPY ./start.sh ./start.sh

# # Use chmod to add execute permissions
# RUN chmod +x /start.sh

RUN chmod +x ./start.sh

# usuario d ocontainer por padrao é o root
# não há problema em usar root em desenvolvimento
# porém em prod pode haver problemas
USER node 






# CMD ["sh", "-c", "npm install && tail -f /dev/null"]

CMD ["tail", "-f" , "/dev/null"]

# usuario d ocontainer por padrao é o root
# não há problema em usar root em desenvolvimento
# porém em prod pode haver problemas
