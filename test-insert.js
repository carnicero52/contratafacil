const { createClient } = require('@libsql/client');

const client = createClient({
  url: 'libsql://fideliqr-carnicero52.aws-us-east-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NzE3OTQ0NjQsImlhdCI6MTc3MTE4OTY2NCwiaWQiOiIxZDRlYTY3Yi05NzYzLTQxOTQtOGM2My1lYjdhYTU0YzY2ZTciLCJyaWQiOiI0YmM2OTU4Zi04NDMyLTRlNWItOTYwMi1jYmQxMjk4YmVhOTgifQ.ttA9GRH7Re1tMA8AWvlIlZ3YW7UjOWLphbSQNyzH0YXJf0vB-xbim3CFO9UbtuZGu9jWZlBgGmy-6qokqwQpBQ'
});

async function test() {
  const id = 'test-' + Date.now();
  const slug = 'cafe-central-' + Date.now();
  
  try {
    await client.execute({
      sql: `INSERT INTO Negocio (id, nombre, slug, email, password, activo, buscandoPersonal, puestoBuscado, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, 1, 1, 'Barista', datetime('now'), datetime('now'))`,
      args: [id, 'Café Central', slug, 'cafe@test.com', 'hashedpassword123']
    });
    console.log('✅ Insert exitoso!');
    
    const result = await client.execute('SELECT * FROM Negocio');
    console.log('Negocios:', result.rows.length);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
