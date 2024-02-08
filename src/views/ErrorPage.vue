<template>
    <div class="container">
        <div class="row" dir="rtl">
            <div class="col-lg-6 col-sm-10">
                <img src="../assets/images/error404.png" class=" img-fluid">
            </div>
            <div class="article col-lg-6 col-sm-10" style="margin-top: 200px;">
                <h1> Error 404</h1>
                <p>
                    We Cant Find This Page , Tre Go to right Link or make Shore From The Spellings of The Wods In The Url
                    You Coped or missing number or deletimg world or key pklese make shoure from All Thekis And Tre Agen
                </p>
                <RouterLink :to="{ name: 'home' }" class="btn btn-danger rounded-5"> Back Home </RouterLink>
            </div>




        </div>
    </div>
</template>


<style scoped>
@media (max-width: 480px) {
   .article{
    margin-top: -30px !important;
   }
}
</style>








