/**
 * ���� ��ȸ API
 */
app.get('/roomlist',function(req,res){

	res.send(io.sockets.manager.rooms);
	
});