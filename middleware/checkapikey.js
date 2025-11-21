// Middleware pour vérifier la clé API
const checkApiKey = (req, res, next) => {
  // Récupérer la clé API depuis les headers
  const apiKey = req.headers['x-api-key'];
  
  // Clé API attendue (en production, stockez-la dans des variables d'environnement)
  const validApiKey = 'ma-super-cle-api-2024';
  
  // Vérification
  if (!apiKey) {
    return res.status(401).json({
      error: 'Non autorisé',
      message: 'Clé API manquante. Ajoutez le header x-api-key à votre requête'
    });
  }
  
  if (apiKey !== validApiKey) {
    return res.status(403).json({
      error: 'Accès refusé',
      message: 'Clé API invalide'
    });
  }
  
  // Si tout est OK, on passe au prochain middleware/route
  console.log('✅ Clé API valide');
  next();
};

module.exports = checkApiKey;