all: update

update: 
	./rezip.sh chat
	wsk -i action update /guest/sharelatex/chat chat.zip --kind  nodejs:10 --web true


