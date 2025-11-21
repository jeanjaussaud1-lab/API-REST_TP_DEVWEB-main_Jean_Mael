const db = require('./database');

// Données de test
const sampleCars = [
  {
    brand: 'Ferrari',
    model: '250 GTO',
    year: 1962,
    color: 'Rouge',
    price: 45000000,
    mileage: 12000,
    description: 'Voiture de collection exceptionnelle'
  },
  {
    brand: 'Porsche',
    model: '911 Carrera RS',
    year: 1973,
    color: 'Blanc',
    price: 850000,
    mileage: 45000,
    description: 'Légendaire modèle RS'
  },
  {
    brand: 'Jaguar',
    model: 'E-Type',
    year: 1961,
    color: 'Bleu',
    price: 320000,
    mileage: 78000,
    description: 'Icône du design automobile'
  },
  {
    brand: 'Mercedes-Benz',
    model: '300 SL',
    year: 1955,
    color: 'Argent',
    price: 1200000,
    mileage: 34000,
    description: 'Portes papillon emblématiques'
  },
  {
    brand: 'Aston Martin',
    model: 'DB5',
    year: 1964,
    color: 'Gris',
    price: 750000,
    mileage: 56000,
    description: 'La voiture de James Bond'
  }
];

// Fonction pour insérer les données
function seedDatabase() {
  // D'abord, on vide la table
  db.run('DELETE FROM cars', (err) => {
    if (err) {
      console.error('❌ Erreur lors du vidage de la table:', err.message);
      return;
    }

    console.log('🗑️  Table vidée');

    // Puis on insère les nouvelles données
    const insertQuery = `
      INSERT INTO cars (brand, model, year, color, price, mileage, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    let insertedCount = 0;

    sampleCars.forEach((car) => {
      db.run(
        insertQuery,
        [car.brand, car.model, car.year, car.color, car.price, car.mileage, car.description],
        (err) => {
          if (err) {
            console.error('❌ Erreur lors de l\'insertion:', err.message);
          } else {
            insertedCount++;
            console.log(`✅ Voiture insérée: ${car.brand} ${car.model}`);

            if (insertedCount === sampleCars.length) {
              console.log('\n🎉 Base de données initialisée avec succès !');
              db.close();
            }
          }
        }
      );
    });
  });
}

// Exécution du seed
seedDatabase();