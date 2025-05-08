import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Example texts for demonstration
  const exampleAIText = `The implementation of artificial intelligence in modern healthcare systems represents a significant paradigm shift in how medical professionals approach patient care and diagnosis. By leveraging sophisticated algorithms and machine learning models, healthcare providers can now analyze vast datasets with unprecedented efficiency, identifying patterns and correlations that might otherwise remain undetected. These AI-driven insights can facilitate earlier detection of diseases, personalized treatment plans, and improved patient outcomes across diverse medical specialties.

Moreover, the integration of AI into clinical workflows has demonstrated the potential to reduce administrative burdens on healthcare practitioners, enabling them to dedicate more time to direct patient interaction. This technological advancement, while promising substantial benefits, must be carefully balanced with considerations regarding data privacy, algorithmic transparency, and the maintenance of the human element in healthcare delivery. As these systems continue to evolve, the collaborative partnership between human expertise and artificial intelligence will likely shape the future landscape of healthcare provision.

The ethical implications of AI in healthcare necessitate robust governance frameworks that address issues such as bias in algorithmic decision-making, equitable access to AI-enhanced services, and the responsible management of sensitive patient data. Healthcare institutions must implement comprehensive policies that ensure AI technologies augment rather than replace the human judgment and empathy essential to quality care. Ongoing stakeholder engagement, including patients, clinicians, ethicists, and technology developers, is crucial for navigating these complex considerations and establishing trust in AI-enabled healthcare solutions.

Looking ahead, the continued advancement of AI in healthcare will likely focus on improving interpretability of algorithms, enabling more personalized interventions, and enhancing interoperability between various health information systems. Emerging research in areas such as federated learning may offer new approaches to collaborative model development while preserving data privacy. Additionally, the application of AI to address global health challenges, including infectious disease surveillance and resource allocation in underserved regions, represents a promising frontier for technology-enabled health equity.`;

  const exampleHumanText = `I've been thinking a lot about how technology changes the way we see the world. It's weird, right? Ten years ago I didn't have this powerful computer in my pocket all the time. Sometimes I miss those days - when we weren't always connected and notifications weren't constantly demanding our attention.

Last weekend I went hiking with my friend Dave. We got completely lost for about two hours because I forgot to download the trail map! It was actually pretty fun though. We ended up finding this amazing little waterfall that wasn't on any of the official paths. Dave slipped on some rocks and got his shoes soaked, which was hilarious at the time (though he didn't think so).

Do you ever wonder if we're better or worse off with all this technology? I go back and forth on it. I love having information at my fingertips, but I hate how it's changed social interactions. Anyway, just some random thoughts I've been having lately.

I remember growing up, my mom would always tell us to go outside and play. She'd say "you're not spending another beautiful day staring at a screen!" And now I catch myself saying the same thing to my nephew when he visits. He's always glued to his tablet. But then I realize I'm being totally hypocritical because the minute he leaves, I'm right back on my phone, scrolling through social media or checking emails.

The thing is, I'm not sure we fully understand what this constant connectivity is doing to our brains long-term. I read this article the other day about how our attention spans have gotten shorter. It actually makes sense - we're constantly jumping between apps, messages, and websites. Nobody sits still with their thoughts anymore. I tried meditating last month but kept reaching for my phone every five minutes. It was embarrassing how difficult it was to just... exist... without digital stimulation.

That camping trip last summer was eye-opening though. Three days with no cell service, and by the third day, I wasn't even thinking about my phone anymore. I noticed more things - the sound of birds in the morning, the way light filtered through the trees, actual conversations with friends without distractions. It felt really good, you know? Like I was fully present in a way I rarely am in daily life.`;

  const loadExampleText = (type) => {
    setText(type === 'ai' ? exampleAIText : exampleHumanText);
    setResult(null);
    setError('');
  };

  const detectAI = async () => {
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    if (wordCount < 100) {
      setError('For accurate results, please enter at least 100 words. For best results, provide 1000+ words.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call with randomized result
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Dummy AI detection logic - in a real app, this would call an API
      const sentenceVariation = calculateSentenceVariation(text);
      const uncommonWords = countUncommonWords(text);

      // Weighted scoring system (simplified)
      let aiScore = 0;

      // Longer texts tend to reveal patterns better
      if (wordCount > 500) aiScore += 0.05;
      if (wordCount > 1000) aiScore += 0.15; // Increased weight for 1000+ words

      // Low sentence variation is a potential AI indicator
      if (sentenceVariation < 0.4) aiScore += 0.3;

      // Few uncommon words might indicate generic AI text
      if (uncommonWords / wordCount < 0.05) aiScore += 0.2;

      // Text pattern entropy (simplified)
      const patternEntropy = calculatePatternEntropy(text);
      if (patternEntropy > 0.7) aiScore += 0.2; // High pattern regularity suggests AI

      // Add some randomness for demo purposes
      aiScore += Math.random() * 0.1;

      // Clamp between 0 and 1
      aiScore = Math.max(0, Math.min(1, aiScore));

      setResult({
        isAI: aiScore > 0.6,
        confidence: Math.round(aiScore * 100)
      });
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate variety in sentence structure (simplified)
  const calculateSentenceVariation = (text) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    if (sentences.length <= 1) return 0;

    const lengths = sentences.map(s => s.trim().split(/\s+/).filter(Boolean).length);
    const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;

    // Calculate variation coefficient
    const variance = lengths.reduce((sum, len) => sum + (len - avgLength) ** 2, 0) / lengths.length;
    const stdDev = Math.sqrt(variance);

    return stdDev / avgLength; // Coefficient of variation
  };

  // Calculate pattern entropy (simplified)
  const calculatePatternEntropy = (text) => {
    // This is a simplified entropy calculation for demonstration
    // Real implementations would use more sophisticated methods

    // Check for repeating phrases or structures
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    const bigramCounts = {};
    let totalBigrams = 0;

    // Count bigrams (pairs of consecutive words)
    for (let i = 0; i < words.length - 1; i++) {
      const bigram = `${words[i]} ${words[i+1]}`;
      bigramCounts[bigram] = (bigramCounts[bigram] || 0) + 1;
      totalBigrams++;
    }

    // Calculate normalized entropy
    let entropy = 0;
    for (const bigram in bigramCounts) {
      const p = bigramCounts[bigram] / totalBigrams;
      entropy -= p * Math.log2(p);
    }

    // Normalize to 0-1 range (higher means more pattern regularity)
    // This is a simplified approach, real entropy would need proper normalization
    return Math.min(1, Math.max(0, 1 - (entropy / Math.log2(totalBigrams || 1))));
  };

  // Count words that might be less common (simplified)
  const countUncommonWords = (text) => {
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    const commonWords = new Set([
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with',
      'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
      'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if',
      'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him',
      'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
      'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two',
      'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give',
      'day', 'most', 'us'
    ]);

    return words.filter(word => !commonWords.has(word)).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            AI Text Detector
          </h1>
          <p className="text-lg text-gray-300 text-center mb-8">
            Check if text was written by AI or a human
          </p>

          <div className="bg-gray-800/50 p-6 rounded-lg shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-gray-300">
                Paste text to analyze
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => loadExampleText('human')}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  Load Human Example
                </button>
                <button
                  onClick={() => loadExampleText('ai')}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  Load AI Example
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-60 p-4 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to analyze (minimum 100 words, 1000+ words recommended for better accuracy)..."
            />

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-400">
                {text ? (
                  <span className={text.split(/\s+/).filter(Boolean).length < 100 ? 'text-yellow-500' : text.split(/\s+/).filter(Boolean).length >= 1000 ? 'text-green-500' : ''}>
                    {text.split(/\s+/).filter(Boolean).length} words
                    {text.split(/\s+/).filter(Boolean).length < 100 ? ' (more recommended)' :
                     text.split(/\s+/).filter(Boolean).length >= 1000 ? ' (excellent for analysis)' : ''}
                  </span>
                ) : 'No text entered'}
              </div>
              <button
                className={`px-6 py-3 rounded-md font-medium transition ${
                  loading
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                }`}
                onClick={detectAI}
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Detect AI'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">
                {error}
              </div>
            )}

            {result && !error && (
              <div className="mt-6 p-6 bg-gray-900/80 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">Detection Result</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.isAI
                        ? 'bg-red-900/60 text-red-200'
                        : 'bg-green-900/60 text-green-200'
                    }`}
                  >
                    {result.isAI ? 'Likely AI-generated' : 'Likely Human-written'}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">AI Probability</span>
                    <span className="text-sm font-medium">{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        result.isAI
                          ? 'bg-gradient-to-r from-yellow-500 to-red-500'
                          : 'bg-gradient-to-r from-green-500 to-teal-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-300">
                  <p className="mb-2">
                    <span className="font-medium text-gray-200">Disclaimer:</span> This is a demonstration tool and uses simplified heuristics.
                  </p>
                  <p>
                    In a production environment, a more sophisticated model would integrate with ML APIs and include additional analysis factors.
                  </p>
                  {text.split(/\s+/).filter(Boolean).length < 1000 && (
                    <p className="mt-2 text-yellow-400">
                      <span className="font-medium">Note:</span> For higher accuracy, we recommend analyzing text with 1000+ words.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <p className="text-gray-300 mb-3">
              This AI detector analyzes text patterns typically associated with AI-generated content:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
              <li>Sentence structure variation</li>
              <li>Word choice diversity</li>
              <li>Text pattern entropy</li>
              <li>Overall text complexity</li>
              <li>Pattern recognition in text flow</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-800 rounded-md">
              <h3 className="text-lg font-medium text-blue-300 mb-2">Accuracy Tip</h3>
              <p className="text-gray-300">
                Analysis accuracy improves significantly with longer text samples:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1 ml-2">
                <li>100+ words: Minimal accuracy</li>
                <li>500+ words: Moderate accuracy</li>
                <li>1000+ words: Good accuracy</li>
                <li>2000+ words: Best accuracy</li>
              </ul>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              No text is stored or shared. All analysis happens in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
