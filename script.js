document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const timePerPairInput = document.getElementById('timePerPair');
    const workingTimeInput = document.getElementById('workingTime');
    const includeBreaksCheckbox = document.getElementById('includeBreaks');
    const breaksContainer = document.getElementById('breaksContainer');
    const breakTimeInput = document.getElementById('breakTime');
    const includeLossCheckbox = document.getElementById('includeLoss');
    const lossContainer = document.getElementById('lossContainer');
    const lossPercentageInput = document.getElementById('lossPercentage');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');
    const idealProductionSpan = document.getElementById('idealProduction');
    const productionWithLossSpan = document.getElementById('productionWithLoss');
    const productionResultSpan = document.getElementById('productionResult');
    const effectiveTimeSpan = document.getElementById('effectiveTime');
    const efficiencyRateSpan = document.getElementById('efficiencyRate');
    const efficiencyMeter = document.getElementById('efficiencyMeter');
    const efficiencyPercentage = document.getElementById('efficiencyPercentage');

    // Event Listeners
    includeBreaksCheckbox.addEventListener('change', function() {
        breaksContainer.classList.toggle('hidden', !this.checked);
    });

    includeLossCheckbox.addEventListener('change', function() {
        lossContainer.classList.toggle('hidden', !this.checked);
    });

    calculateBtn.addEventListener('click', calculateProduction);

    /**
     * Calcula a produção diária de calçados.
     */
    function calculateProduction() {
        const timePerPair = parseFloat(timePerPairInput.value.trim());
        let workingTime = parseFloat(workingTimeInput.value.trim());

        // Validação básica
        if (!timePerPair || timePerPair <= 0) {
            alert('Por favor, insira um tempo válido para produzir um par de calçados.');
            return;
        }

        if (!workingTime || workingTime <= 0) {
            alert('Por favor, insira um tempo válido para o tempo de trabalho diário.');
            return;
        }

        // Diminuir pausas caso estejam ativadas
        if (includeBreaksCheckbox.checked) {
            const breakTime = parseFloat(breakTimeInput.value.trim()) || 0;
            workingTime -= breakTime * 60; // Converte minutos para segundos
            if (workingTime <= 0) {
                alert('O tempo de pausa não pode ser maior ou igual ao tempo de trabalho diário.');
                return;
            }
        }

        // Calcular produção ideal (100% eficiência)
        const idealProduction = Math.floor(workingTime / timePerPair);

        // Calcular produção com perda de eficiência (se houver)
        let efficiencyRatio = 1; // Eficiência padrão (100%)
        if (includeLossCheckbox.checked) {
            const lossPercentage = parseFloat(lossPercentageInput.value.trim()) || 0;
            if (lossPercentage < 0 || lossPercentage > 100) {
                alert('Por favor, insira um percentual de perda entre 0 e 100.');
                return;
            }
            efficiencyRatio = (100 - lossPercentage) / 100;
        }
        const actualProduction = Math.floor(idealProduction * efficiencyRatio);

        // Estatísticas de eficiência
        const effectiveHours = (workingTime / 3600).toFixed(2); // Tempo efetivo de trabalho em horas
        const efficiencyRate = (actualProduction / effectiveHours).toFixed(2); // Pares por hora

        // Atualizar elementos no DOM
        productionResultSpan.textContent = actualProduction;
        idealProductionSpan.textContent = idealProduction;
        productionWithLossSpan.textContent = actualProduction;
        effectiveTimeSpan.textContent = effectiveHours;
        efficiencyRateSpan.textContent = efficiencyRate;

        // Atualizar barra de eficiência
        efficiencyMeter.style.width = `${efficiencyRatio * 100}%`;
        efficiencyPercentage.textContent = `${(efficiencyRatio * 100).toFixed(1)}%`;

        // Mostrar a seção de resultados
        resultContainer.classList.remove('hidden');
    }
});