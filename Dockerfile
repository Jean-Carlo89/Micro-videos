FROM node:14.15.4-slim
# Install 'tail' utility
# it seems that this node version 14.15.4-slim does not gave tail anymore
# RUN apt-get update && apt-get install -y tail

# usuario d ocontainer por padrao é o root
# não há problema em usar root em desenvolvimento
# porém em prod pode haver problemas
USER node 

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && tail -f /dev/null"]

# usuario d ocontainer por padrao é o root
# não há problema em usar root em desenvolvimento
# porém em prod pode haver problemas
