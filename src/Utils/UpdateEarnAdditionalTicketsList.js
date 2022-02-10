const updateEarnAdditionalTicketsList = (
    earnAdditionalBenefitStatus,
    prizeId
) => {
    let idx = earnAdditionalBenefitStatus.findIndex(
        (e) => e.prizeId === prizeId
    );
    if (idx > -1) earnAdditionalBenefitStatus.splice(idx, 1);
    return earnAdditionalBenefitStatus;
};

export default updateEarnAdditionalTicketsList;
