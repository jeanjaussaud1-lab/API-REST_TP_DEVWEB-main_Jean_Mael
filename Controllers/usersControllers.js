const db = require('../database');

// GET - Récupérer toutes les voitures
exports.getAllCars = (req, res) => {
  const query = 'SELECT * FROM cars ORDER BY year DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Erreur lors de la récupération des voitures',
        details: err.message 
      });
    }
    
    res.json({
      success: true,
      message: 'Liste des voitures récupérée',
      count: rows.length,
      data: rows
    });
  });
};

// GET - Récupérer une voiture par ID
exports.getCarById = (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM cars WHERE id = ?';
  
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Erreur serveur',
        details: err.message 
      });
    }
    
    if (!row) {
      return res.status(404).json({ 
        error: 'Voiture non trouvée',
        message: `Aucune voiture avec l'ID ${id}` 
      });
    }
    
    res.json({
      success: true,
      message: 'Voiture trouvée',
      data: row
    });
  });
};

// POST - Créer une nouvelle voiture
exports.createCar = (req, res) => {
  const { brand, model, year, color, price, mileage, description } = req.body;
  
  // Validation des données
  if (!brand || !model || !year) {
    return res.status(400).json({ 
      error: 'Données invalides',
      message: 'Les champs brand, model et year sont obligatoires' 
    });
  }
  
  const query = `
    INSERT INTO cars (brand, model, year, color, price, mileage, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(
    query,
    [brand, model, year, color, price, mileage, description],
    function(err) {
      if (err) {
        return res.status(500).json({ 
          error: 'Erreur lors de la création',
          details: err.message 
        });
      }
      
      res.status(201).json({
        success: true,
        message: 'Voiture créée avec succès',
        data: {
          id: this.lastID,
          brand,
          model,
          year,
          color,
          price,
          mileage,
          description
        }
      });
    }
  );
};

// PUT - Modifier une voiture existante
exports.updateCar = (req, res) => {
  const id = req.params.id;
  const { brand, model, year, color, price, mileage, description } = req.body;
  
  // Vérifier si la voiture existe
  db.get('SELECT * FROM cars WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Erreur serveur',
        details: err.message 
      });
    }
    
    if (!row) {
      return res.status(404).json({ 
        error: 'Voiture non trouvée' 
      });
    }
    
    const query = `
      UPDATE cars 
      SET brand = ?, model = ?, year = ?, color = ?, price = ?, mileage = ?, description = ?
      WHERE id = ?
    `;
    
    db.run(
      query,
      [brand, model, year, color, price, mileage, description, id],
      function(err) {
        if (err) {
          return res.status(500).json({ 
            error: 'Erreur lors de la mise à jour',
            details: err.message 
          });
        }
        
        res.json({
          success: true,
          message: 'Voiture mise à jour avec succès',
          data: {
            id,
            brand,
            model,
            year,
            color,
            price,
            mileage,
            description
          }
        });
      }
    );
  });
};

// DELETE - Supprimer une voiture
exports.deleteCar = (req, res) => {
  const id = req.params.id;
  
  // Vérifier si la voiture existe
  db.get('SELECT * FROM cars WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Erreur serveur',
        details: err.message 
      });
    }
    
    if (!row) {
      return res.status(404).json({ 
        error: 'Voiture non trouvée' 
      });
    }
    
    db.run('DELETE FROM cars WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ 
          error: 'Erreur lors de la suppression',
          details: err.message 
        });
      }
      
      res.json({
        success: true,
        message: 'Voiture supprimée avec succès',
        data: { id }
      });
    });
  });
};