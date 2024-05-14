import React from "react";
import styles from "../style/Terms.module.css"

export default function Terms() {
    return (
        <div>
            <h1 className={styles.h1terms}>Contrato de Uso da Loja de Jogos Take Control</h1>
            <ul className={styles.contractlist}>
                <li>
                    <strong>1. Aceitação dos Termos:</strong> Ao acessar ou usar a Loja, você concorda em cumprir os termos e condições deste Contrato. Se você não concordar com estes termos, não poderá acessar ou usar a Loja.
                </li>
                <li>
                    <strong>2. Direitos de Propriedade:</strong> A Loja, incluindo todo o seu conteúdo, é propriedade exclusiva da Take Control ou de seus licenciadores. Você reconhece e concorda que a Loja contém informações confidenciais e protegidas por direitos autorais que são propriedade da Take Control e de terceiros.
                </li>
                <li>
                    <strong>3. Restrições de Uso:</strong> Você concorda em usar a Loja apenas para fins legais e de acordo com este Contrato. Você concorda em não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte da Loja para qualquer finalidade comercial sem o consentimento expresso por escrito da Take Control.
                </li>
                <li>
                    <strong>4. Anti-Pirataria e Proteção de Propriedade Intelectual:</strong> Você reconhece e concorda que a pirataria de jogos é ilegal e prejudica os desenvolvedores e a indústria de jogos como um todo. Você concorda em não piratear, modificar, distribuir ou fazer engenharia reversa de qualquer jogo adquirido na Loja.
                </li>
                <li>
                    <strong>5. Responsabilidades do Usuário:</strong> Você é responsável por todas as atividades que ocorrem em sua conta na Loja. Você concorda em manter sua senha e informações de conta em sigilo e notificar imediatamente a Take Control sobre qualquer uso não autorizado de sua conta.
                </li>
                <li>
                    <strong>6. Isenção de Responsabilidade:</strong> A Take Control não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou incapacidade de usar a Loja.
                </li>
                <li>
                    <strong>7. Alterações nos Termos:</strong> A Take Control se reserva o direito de modificar ou revisar este Contrato a qualquer momento, mediante aviso prévio razoável. O uso contínuo da Loja após tais modificações constitui sua aceitação dos termos revisados.
                </li>
                <li>
                    <strong>8. Lei Aplicável e Jurisdição:</strong> Este Contrato será regido e interpretado de acordo com as leis do [país/estado]. Qualquer disputa decorrente deste Contrato estará sujeita à jurisdição exclusiva dos tribunais competentes no [país/estado].
                </li>
            </ul>
        </div>
    );
}